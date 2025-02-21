'use client';

import { Metadata } from "next"
import { Button } from "components/Button/Button"
import { LP_GRID_ITEMS } from "lp-items"
import LocaleSwitcherSelect from "../../components/LocaleSwitcherSelect";
import Image from 'next/image'
import {useTranslations} from "next-intl";


export default function Web() {
  const t = useTranslations("code");

  return (
      <>
        <section className="bg-white dark:bg-gray-900">
            <div style={{ height: '100vh', overflowY: 'auto' }}>
                <Image
                    src="/images/web_back_image.png"
                    alt="Logo"
                    width={1200}
                    height={1200}  // 假设图片的高度比较大
                    style={{ width: '100%' }}  // 使图片宽度自适应屏幕
                />
            </div>
        </section>
      </>
  )
}