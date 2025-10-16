type BaseState<K, T = keyof K> = {
  init?: () => void
  getData: (_key: T) => K[T] | undefined
  setData: (_key: T, _value: K[T]) => void
  setState: (_obj: Partial<Record<T, K[T]>>) => void
}

// 合并状态字段和基础方法
type UseStore<T> = T & BaseState<T>
