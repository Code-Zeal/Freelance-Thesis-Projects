import * as ImagePicker from 'expo-image-picker';

const openGallery = async (type) => {
  let mediaType = type === "video" ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: mediaType,
    quality: 1,
  });
  
  if (!result.canceled) {
    return result.assets[0].uri;
  } else {
    return null;
  }
};

export default openGallery;
