export const storeUtils = (set: any, get?: any) => ({
  setData: (key: any, data: any, cb?: () => void) => {
    set((state: any) => {
      //@ts-ignore
      state[key] = data
      cb && cb()
    })
  },
  getData: (key: any) => {
    if (!get) throw new Error('请传入get方法')
    const data = get()
    return data[key]
  },
  setState: (obj: any, cb?: () => void) => {
    set((state: any) => {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const data = obj[key as keyof typeof obj]
          //@ts-ignore
          state[key] = data
        }
      }
      cb && cb()
    })
  },
})
