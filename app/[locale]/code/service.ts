import axios from "axios"
import {BoxModalData, FileInfo} from "./type"

const IntroduceService = {
  getIntroduce: async (id: string,locale:string): Promise<BoxModalData | null> => {
    try {
      const res = await axios.get("http://1.116.107.92:9000/api/resource/boxModel/getBoxDetail", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          id: id,
          languageVersion:locale
        },
      })

      // 在 axios 中，返回的 res.data 就是已经解析好的 JSON 数据
      if (res.data.data) {
        return res.data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
      throw error
    }
  },

  getFiles:async (fileIds:string[]):Promise<FileInfo[]>=>{
    const params = new URLSearchParams();
    fileIds.forEach(id => params.append('fileIds', id));
    try {
      const res = await axios.get("http://1.116.107.92:9000/api/file/batchPreview", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          fileIds: fileIds.toString(),
        },
      })

      // 在 axios 中，返回的 res.data 就是已经解析好的 JSON 数据
      return res.data.data
    } catch (error) {
      console.error("Failed tofetch data:", error)
      throw error
    }
  }
}

export default IntroduceService;