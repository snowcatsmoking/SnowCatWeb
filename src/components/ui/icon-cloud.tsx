"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";
import { Loading } from "@/components/shared/Loading";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
};

async function loadLocalIcon(slug: string): Promise<SimpleIcon | null> {
  try {
    const res = await fetch(`/images/techIcons/${slug}.svg`);
    if (!res.ok) return null;
    const text = await res.text();

    const titleMatch = text.match(/<title>([^<]+)<\/title>/);
    const pathMatch = text.match(/<path\s+d="([^"]+)"/);
    const hexMatch = text.match(/fill="#([0-9a-fA-F]{6})"/);

    if (!pathMatch) return null;

    return {
      slug,
      title: titleMatch?.[1] ?? slug,
      hex: hexMatch?.[1] ?? "000000",
      source: "",
      svg: text,
      path: pathMatch[1],
      guidelines: undefined,
      license: undefined,
    } as SimpleIcon;
  } catch {
    return null;
  }
}

export type DynamicCloudProps = {
  iconSlugs: string[];
};

export default function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [icons, setIcons] = useState<SimpleIcon[] | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    Promise.all(iconSlugs.map(loadLocalIcon)).then((results) => {
      setIcons(results.filter((icon): icon is SimpleIcon => icon !== null));
    });
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!icons) return null;
    return icons.map((icon) => renderCustomIcon(icon, theme || "light"));
  }, [icons, theme]);

  if (!mounted) return <div className="w-full h-full min-h-[400px]" />;

  return (
    <div className="w-full h-full min-h-[400px]">
      {icons ? (
        // @ts-ignore
        <Cloud {...cloudProps}>
          <>{renderedIcons}</>
        </Cloud>
      ) : (
        <div className="flex items-center justify-center h-full">
          <Loading text="Loading..." />
        </div>
      )}
    </div>
  );
}
