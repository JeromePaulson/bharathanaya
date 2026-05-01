import React from 'react';

/**
 * A wrapper for the <img> tag that deters right-clicking and drag/drop.
 * It uses an absolute positioned overlay to prevent direct interaction with the image.
 * This preserves SEO as the image tag remains in the DOM and is crawlable.
 */
export default function ProtectedImage({ src, alt, className, style, watermark, loading = 'lazy', ...props }) {
  return (
    <div
      className={`protected-image-container ${className || ''}`}
      style={{ position: 'relative', display: 'inline-block', borderRadius: style?.borderRadius, overflow: style?.borderRadius ? 'hidden' : undefined, ...style }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading={loading}
        decoding="async"
        className="protected-image"
        style={{ display: 'block', width: '100%', height: 'auto', objectFit: style?.objectFit, borderRadius: style?.borderRadius }}
        {...props}
      />
      
      {/* Invisible overlay to block interaction */}
      <div
        className="protected-image-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          background: 'transparent',
        }}
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Optional watermark text */}
      {watermark && (
        <div
          className="protected-image-watermark"
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '0.8rem',
            pointerEvents: 'none',
            zIndex: 11,
            userSelect: 'none',
          }}
        >
          {watermark}
        </div>
      )}
    </div>
  );
}
