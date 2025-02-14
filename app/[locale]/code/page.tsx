"use client"
import React, { useEffect, useState } from "react"
import { BoxModalData, FileInfo } from "./type"
import IntroduceService from "./service"
import { useSearchParams } from "next/navigation"
import ProductGallery from "../../../components/Image/imageSwiper"
import LocaleSwitcherSelect from "../../../components/LocaleSwitcherSelect"
import {useLocale, useTranslations} from "next-intl";


const ProductDetails: React.FC = () => {
    const [data, setProductData] = useState<BoxModalData | null>();
    const [imageFileList, setImageFileList] = useState<FileInfo[]>([]);
    const [productDocument, setProductDocument] = useState<FileInfo[]>([]);
    const [introduceVideo, setIntroduceVideo] = useState<FileInfo[]>([]);
    const [constructionVideo, setConstructionVideo] = useState<FileInfo[]>([]);
    const [solveVideo, setSolveVideo] = useState<FileInfo[]>([]);
    const  t  = useTranslations('code')  // 'common' 对应的是翻译文件名
    const searchParams = useSearchParams()
    const local=useLocale();

    const id = searchParams.get('id')

    function fetchAndSetFiles(fileId: string[] |undefined | string, setFileList: (files: FileInfo[]) => void) {
        if (fileId) {
            IntroduceService.getFiles(Array.isArray(fileId)?fileId:[fileId]).then((file)=>{
                setFileList(file)
            })
        } else {
            setFileList([]);
        }
    }

    const tableData = [
        { label: t('productName'), value: data?.name??'' },
        { label: t('modelNumber'), value: data?.modelNumber },
        { label: t('brand'), value: data?.brand ?? '' },
        { label: t('color'), value: data?.color ?? '' },
        { label: t('dimension'), value: data?.dimension ?? '' },
        { label: t('specification'), value: data?.specification ?? '' },
        { label: t('material'), value: data?.material ?? '' },
        { label: t('seriesName'), value: data?.seriesName ?? '' },
        { label: t('secondarySeriesName'), value: data?.secondarySeriesName ?? '' },
        { label: t('weight'), value: data?.weight?`${data?.weight}g` : '' },
        { label: t('waterproofGrade'), value: data?.waterproofGrade ?? '' },
        { label: t('maxServiceLife'), value: data?.maxServiceLife?`${data?.maxServiceLife}年` : '' },
        { label: t('remark'), value: data?.remark || '无' }
    ];


    useEffect(() => {


        IntroduceService.getIntroduce(id??'',local==='zh'?'zh-CN':'en-US').then(
            (data) => {
                if(data!==null){
                    setProductData(data);
                    fetchAndSetFiles(data.boxImage,setImageFileList);
                    fetchAndSetFiles(data.productDocument,setProductDocument);
                    fetchAndSetFiles(data.introduceVideo,setIntroduceVideo);
                    fetchAndSetFiles(data.constructionVideo,setConstructionVideo);
                    fetchAndSetFiles(data.solveVideo,setSolveVideo);
                }else {
                    setProductData(null);
                }

            },
        )


    }, [ local])


    if (data===undefined) return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Loading...</div>
    if (data===null)return <div className="flex items-center justify-center min-h-screen bg-gray-100 py-4 relative">
        <div className="text-left ml-10">{t('notFound')}</div>
        <div className="absolute mt-28 ml-32"><LocaleSwitcherSelect/></div>
    </div>


    return (
        <>

            <div className="flex items-start justify-center min-h-screen bg-gray-100 p-4">
                <div className="text-center relative">
                    {/* h1 标签保持居中 */}
                    <h1 className="text-xl font-bold mb-8">{t('productDetail')}</h1> {/* 页面标题 */}

                    {/* 按钮放在右上角 */}
                        <LocaleSwitcherSelect/>
                    <ProductGallery images={imageFileList.map((image) => `${image.accessUrl}`)}/> {/* 使用轮播组件 */}

                    <div className="bg-white shadow-md rounded overflow-hidden mt-8 max-w-xl mx-auto text-left px-10">
                        <h2 className="text-lg font-bold p-4 border-b">{t('productBasicInfo')}</h2>
                        <table className="min-w-full bg-white">
                            <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2 font-semibold text-gray-700 text-left">{row.label}</td>
                                    <td className="px-4 py-2 text-gray-600 text-left">{row.value}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-white shadow-md rounded overflow-hidden mt-2 max-w-xl mx-auto text-left px-10">
                        <h2 className="text-lg font-bold p-4 border-b ">{t('productDocumentationLinks')}</h2>
                        <ul className="list-none space-y-1.25 pl-4 m-0">
                            {productDocument.map((link, index) => (
                                <li key={index} className="mb-2">
                                    <a href={`${link.accessUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        {link.fileName}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* 产品宣传视频/安装视频 */}
                    {introduceVideo.length!==0&&<div className="bg-white shadow-md rounded overflow-hidden mt-2 max-w-xl mx-auto text-left px-10">
                        <h2 className="text-lg font-bold p-4 border-b ">{t('productIntroduceVideo')}</h2>
                        {/* 使用 video 标签 */}
                        <div className="mt-4">
                            <video
                                controls
                                className="w-full h-auto rounded"
                                src={`${introduceVideo.length!==0?introduceVideo[0]?.accessUrl:''}`}
                            >
                                <source src={`${introduceVideo.length!==0?introduceVideo[0]?.accessUrl:''}`} type="video/mp4" />
                                您的浏览器不支持视频播放，请升级浏览器。
                            </video>
                        </div>
                    </div>}
                    {
                        constructionVideo.length!==0&&<div className="bg-white shadow-md rounded overflow-hidden mt-2 max-w-xl mx-auto text-left px-10">
                            <h2 className="text-lg font-bold p-4 border-b ">{t('productConstructionVideo')}</h2>
                            {/* 使用 video 标签 */}
                            <div className="mt-4">
                                <video
                                    controls
                                    className="w-full h-auto rounded"
                                    src={`${constructionVideo.length!==0?constructionVideo[0]?.accessUrl:''}`}
                                >
                                    <source src={`${constructionVideo.length!==0?constructionVideo[0]?.accessUrl:''}`} type="video/mp4" />
                                    您的浏览器不支持视频播放，请升级浏览器。
                                </video>
                            </div>
                        </div>
                    }
                    {
                        solveVideo.length!==0&&<div className="bg-white shadow-md rounded overflow-hidden mt-2 max-w-xl mx-auto text-left px-10">
                            <h2 className="text-lg font-bold p-4 border-b ">{ t('productSolveVideo')}</h2>
                            {/* 使用 video 标签 */}
                            <div className="mt-4">
                                <video
                                    controls
                                    className="w-full h-auto rounded"
                                    src={`${solveVideo.length!==0?solveVideo[0]?.accessUrl:''}`}
                                >
                                    <source src={`${solveVideo.length!==0?solveVideo[0]?.accessUrl:''}`} type="video/mp4" />
                                    您的浏览器不支持视频播放，请升级浏览器。
                                </video>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ProductDetails
