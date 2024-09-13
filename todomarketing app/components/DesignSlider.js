import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import templates from './Design/templates.json';
function DesignSlider({setModal,setProduct}) {
  
  const [index, setIndex] = useState(0);
  const [dataTemplates, setDataTemplates] = useState([])
  const indexRef = useRef(index);
  indexRef.current = index;
  
  useEffect(() => {
    let cat1 = templates.categories[1]
    let cat2 = templates.categories[0]
    let cat3 = templates.categories[3]
    let cat4 = templates.categories[4]

    let temp1 = cat1.templates[5]
    let temp2 = cat1.templates[0]
    let temp3 = cat2.templates[1]
    let temp4 = cat2.templates[7]
    let temp5 = cat3.templates[4]
    let temp6 = cat3.templates[3]
    let temp7 = cat4.templates[2]
    let temp8 = cat4.templates[3]
    let arrTemp = [temp1,temp2,temp3,temp4,temp5,temp6,temp7,temp8]
    const transformedArray = arrTemp.map((item, index) => {
      
      return {
        id: index,
        image: item?.previewImage,
        title: `This is the title! ${index + 1}`,
        subtitle: `This is the subtitle ${index + 1}!`,
        nameTemplate:item?.nameTemplate,
        templateImage: item?.templateImage
      };
    });
    setDataTemplates(transformedArray)
  }, [])
  
  
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);
  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(e => e.id, []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: widthPercentageToDP(100),
        offset: index * widthPercentageToDP(100),
      }),
      []
    ),
  };
  
  const slideList = Array.from({ length: 8 }).map((_, i) => {
    return {
      id: i,
      image: `https://picsum.photos/1440/2842?random=${1}`,
      title: `This is the title! ${i + 1}`,
      subtitle: `This is the subtitle ${i + 1}!`,
    };
  });
  function Slide({ data }) {
    return (
      <TouchableOpacity
      onPress={()=>{
        
        setProduct("")
        setModal(data)
        }}
        style={{
          height: heightPercentageToDP(25),
          width: widthPercentageToDP(50),
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection:"row",
        }}
      >
        <Image
          source={{ uri: data.image }}
          style={{ width: widthPercentageToDP(50) * 0.9, height: heightPercentageToDP(25) }}
        ></Image>
      </TouchableOpacity>
    );
  }
  return (
    <FlatList
    data={dataTemplates}
    renderItem={({ item }) => {
      return <Slide data={item} />
    }}
    pagingEnabled
    horizontal
    showsHorizontalScrollIndicator={false}
    onScroll={onScroll}
    {...flatListOptimizationProps}
    style={{ flex: 1}}
  />
  )
}

export default DesignSlider