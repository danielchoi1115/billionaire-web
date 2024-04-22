const assetTypes = {
  '01': '위험자산',
  '02': '안전자산',
  '03': '위험자산',
  '04': '위험자산',
  '05': '안전자산',
  '06': '안전자산'
}

export const getAssetType = (assetClassCd) => assetTypes[assetClassCd]
