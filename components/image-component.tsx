interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export const Image = ({ src, alt, width, height, className }: ImageProps) => (
  <img
    src={src || "/placeholder.svg"}
    alt={alt}
    width={width}
    height={height}
    className={className}
    style={{ objectFit: "contain" }}
  />
)
