"use client";
import { useState } from "react";
import Settings from "@/app/(dashboard)/settings/page";

const SettingsWrapper = () => {
  const [showSettings, setShowSettings] = useState(false);

  return showSettings ? <Settings /> : null;
};

export default SettingsWrapper;
