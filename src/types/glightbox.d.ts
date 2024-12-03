declare module 'glightbox' {
  interface GLightboxElement {
    href: string;
    type?: string;
    title?: string;
    description?: string;
    width?: number | string;
    height?: number | string;
    autoplay?: boolean;
    poster?: string;
    sources?: Array<{ src: string; type: string }>;
  }

  interface GLightboxOptions {
    selector?: string;
    elements?: GLightboxElement[];
    skin?: string;
    type?: string;
    width?: number | string;
    height?: number | string;
    zoomable?: boolean;
    draggable?: boolean;
    dragToleranceX?: number;
    dragToleranceY?: number;
    dragAutoSnap?: boolean;
    preload?: boolean;
    autoplayVideos?: boolean;
    autofocusVideos?: boolean;
    href?: string | null;
    source?: string;
  }

  export default function GLightbox(options?: GLightboxOptions): {
    open(): void;
    close(): void;
    destroy(): void;
  };
}
