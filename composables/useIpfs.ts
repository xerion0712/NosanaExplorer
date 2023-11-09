const { nosana } = useSDK();
const ipfsList: Ref<any> = useLocalStorage('ipfs', {});

const getIpfs = async (hash: string) => {
  try {
    if (!ipfsList.value[hash]) {
      ipfsList.value[hash] = await nosana.value.ipfs.retrieve(hash);
    }
    return ipfsList.value[hash]
      ? (JSON.parse(JSON.stringify(ipfsList.value[hash])) as Object)
      : ipfsList.value[hash];
  } catch (e) {
    console.error(e);
  }
};

export const useIpfs = () => {
  return { ipfsList, getIpfs };
};
