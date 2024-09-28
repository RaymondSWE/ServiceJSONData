"use client";

import React, { useState, useEffect } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("alertModal");

  useEffect(() => {
    setIsMounted(true);
    // return () => {
    //     setIsMounted(false);
    // };
  }, []);

  if (!isMounted) {
    return null;
  }

  const description = itemName
  ? `${t("description")} ${t("deleteDescription", { itemName })}`
  : t("description");


  return (
    <Modal
      title={t("title")}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-4 space-x-2 flex item-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          {t("cancelButton")}
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          {t("deleteButton")}
        </Button>
      </div>
    </Modal>
  );
};
