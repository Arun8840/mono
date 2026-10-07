import React, { useEffect, useRef, useState } from "react";
import DroppedComponentWrapper from "../component-wrapper";
import { ComponentWrapperProps } from "@/types/comp.wrapper.types";
import { Button, Spinner, toast } from "@repo/ui/components";
import { HugeiconsIcon } from "@hugeicons/react";
import { UploadFreeIcons } from "@hugeicons/core-free-icons";
import { useMutation } from "@tanstack/react-query";
import { client } from "@repo/server/client";

export interface ImageComponentProps extends ComponentWrapperProps { }
const ImageComponent: React.FC<ImageComponentProps> = ({
  value,
  dimensions,
  isPreview,
}) => {
  const uploaderRef = useRef<HTMLInputElement>(null);
  const blobUrlRef = useRef<string | null>(null);
  const { properties } = value;
  const [image, setImage] = useState<string | undefined>();

  console.log(value)

  useEffect(() => {
    if (properties?.src) {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
      setImage(properties.src);
    }
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, [properties?.src]);

  //*HOOKS
  const createAsset = useMutation({
    mutationFn: async (file: File) => {
      const request = {
        componentId: value?.id,
        applicationId: value?.applicationId,
        file,
      };
      const response = await client.component.asset.upload.post(request);
      return response.data?.data?.src as string;
    },
    onSuccess: (src) => {
      if (src) {
        if (blobUrlRef.current) {
          URL.revokeObjectURL(blobUrlRef.current);
          blobUrlRef.current = null;
        }
        setImage(src);
      }
      toast.success("Image uploaded successfully");
    },
    onError: () => {
      toast.error("Failed to upload image");
    },
  });

  const isPending = createAsset?.isPending;

  const triggerUploader = () => uploaderRef.current?.click();
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    const blobUrl = URL.createObjectURL(file);
    blobUrlRef.current = blobUrl;
    setImage(blobUrl);
    createAsset.mutate(file);
  };
  const createUploader = () => {
    return (
      <div className="border border-primary size-full flex flex-col justify-center items-center gap-2">
        <p className="text-muted-foreground">Upload Image</p>
        <input
          type="file"
          accept="image/*"
          ref={uploaderRef}
          className="sr-only"
          onChange={handleImageUpload}
        />
        <Button disabled={isPending} size={"sm"} onClick={triggerUploader}>
          {isPending ? (
            <>
              <Spinner /> Uploading...
            </>
          ) : (
            <>
              <HugeiconsIcon icon={UploadFreeIcons} /> Upload
            </>
          )}
        </Button>
      </div>
    );
  };

  const createImagePreview = () => {
    return (
      <div className="size-full">
        <img
          src={image}
          alt={`${value?.id}_image`}
          className="size-full object-center"
        />
      </div>
    );
  };
  return (
    <DroppedComponentWrapper
      value={value}
      dimensions={dimensions}
      isPreview={isPreview}
    >
      <div className="size-full">
        {image ? createImagePreview() : createUploader()}
      </div>
    </DroppedComponentWrapper>
  );
};

export default React.memo(ImageComponent);
