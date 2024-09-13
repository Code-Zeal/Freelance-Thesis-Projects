import * as ImagePicker from 'expo-image-picker';

const camera = async (type) => {
  let mediaType = type === "video" ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images
  
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: mediaType,
    quality: 1,
  });

  if (!result.canceled) {
    return result.uri;
  } else {
    return null;
  }
};
export default camera;
