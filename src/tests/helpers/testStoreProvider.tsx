import React from 'react'
import { useRootStore } from '../../utils/RootStoreProvider/useRootStore'

const testStoreProvider = () => {
  const rootStore = useRootStore()

  return (
    <div>testStoreProvider</div>
  )
}

export default testStoreProvider