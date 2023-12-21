import { useEffect, useState } from "react"
import OutsideClickHandler from "react-outside-click-handler";
import clsx from "clsx";

import LinkIcon from "../../assets/link-icon.svg?react"
import ExternalSVGIcon from "../../assets/nav-external-link-icon.svg?react"
import ClipboardHelper from "../../lib/utils/util-clipboard";

interface INavLinkCopy {
  link: string;
  title?: string
  description?: string
}

function NavLinkCopy({ link, title, description }: INavLinkCopy) {
  const [copyModalOpen, setCopyModalOpen] = useState(false);

  async function handleClick() {
    if (navigator.share) {
      const shareData = {
        title: title || '',
        text: description || '',
        url: link,
      };
      await navigator.share(shareData);
    } else {
      ClipboardHelper.writeToClipboard(link)
      setCopyModalOpen(true)
    }
  }

  useEffect(() => { 
    if (copyModalOpen) {
      setTimeout(() => {
        setCopyModalOpen(false);
      }, 3000);
    }
  }, [copyModalOpen])

  return (
    <div className="relative flex items-center">
      <button type="button" onClick={() => handleClick()}>
        <ExternalSVGIcon className="w-9 h-9" />
      </button>
      {copyModalOpen && (
        <OutsideClickHandler onOutsideClick={() => setCopyModalOpen(false)}>
          <div
            className={clsx(
              "absolute top-[120%] mt-2 flex py-[6px] px-3 gap-x-[6px]",
              "bg-white text-link-blue items-center left-[10px]"
            )}
          >
            <LinkIcon className="w-[18px] h-[18px]" />

            <span className="uppercase whitespace-nowrap text-[9px] leading-[9px]">
              Link Copied
            </span>
          </div>
        </OutsideClickHandler>
      )}
    </div>
    
  )
}

export default NavLinkCopy