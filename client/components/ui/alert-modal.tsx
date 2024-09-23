"use client";

import React, { useState, useEffect } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  itemName?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  itemName,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // return () => {
    //     setIsMounted(false);
    // };
  }, []);

  if (!isMounted) {
    return null;
  }

  const description =
    `This action cannot be undone.` +
    (itemName ? ` This will permanently delete "${itemName}".` : "");

  return (
    <Modal
      title="Are you sure?"
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-4 space-x-2 flex item-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};
