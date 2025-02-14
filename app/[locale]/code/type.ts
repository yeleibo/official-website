export interface BoxModalData {
    id?: number;
    /** 图片链接 */
    boxImage?: string[];

    /** 品牌名称 */
    brand?: string;

    /** 颜色 */
    color?: string;

    /** 客户 ID */
    customerId?: number;
    codeType?: string;
    activeStatus?: string;


    /** 尺寸规格，格式为 "长x宽x高" */
    dimension?: string;

    /** 产品介绍的 URL */
    introduceUrl?: string;

    /** 材质 */
    material?: string;

    /** 最大使用寿命 (单位：年) */
    maxServiceLife?: number;

    /** 型号编号 */
    modelNumber?: string;

    /** 产品名称 */
    name?: string;

    /** 前缀代码 */
    prefixCode?: string;

    /** 子系列名称 */
    secondarySeriesName?: string;

    /** 系列名称 */
    seriesName?: string;

    /** 规格 */
    specification?: string;

    /** 符号 */
    symbol?: string;

    /** 防水等级 */
    waterproofGrade?: number;

    /** 重量 (可以包含单位，例如 "1.5kg") */
    weight?: string;
    qrCount?:number;
    productDocument:string[];
    introduceVideo:string;
    constructionVideo:string;
    solveVideo:string;
    resourceManagementSupport?:string;
    remark?:string;
}

export interface FileInfo {
    fileId: string;
    linkType: string;
    linkId: string;
    tenantId: string;
    fileName: string;
    fileSuffix: string;
    fileNewName: string;
    fileSize: number;
    createUserId: number;
    createTime: string; // 可以考虑使用 Date 类型，如果你在处理日期时需要更复杂的操作
    updateUserId: number;
    updateTime: string;
    deleted: number;
    accessUrl: string;
    savePath: string;
}