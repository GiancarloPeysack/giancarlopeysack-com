import Link from "next/link";
import { AnchorHTMLAttributes, forwardRef } from "react";

/**
 * Internal routes go through next/link (client-side navigation, like Framer's
 * router); external URLs open in a new tab with rel="noopener", matching the
 * template's rendered anchors; mailto/tel/# stay plain anchors.
 */
export const SmartLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>(
  function SmartLink({ href, children, ...rest }, ref) {
    if (href.startsWith("/")) {
      return (
        <Link ref={ref} href={href} {...rest}>
          {children}
        </Link>
      );
    }
    const external = /^https?:\/\//.test(href);
    return (
      <a ref={ref} href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})} {...rest}>
        {children}
      </a>
    );
  },
);
