import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import PostCard from "./PostCard.js";
import { GetEntrepreneurship } from "../../api/entrepreneurship";
import { GetMyPosts } from "../../api/post";
import { useFocusEffect } from "@react-navigation/native";
import PostDetail from "./PostDetail.js";

function ProfilePosts({
  navigation,
  entrepreneurship,
  profileSection,
  setProfileSection,
  postDetailStatus,
  setPostDetailStatus
}) {
  const [postsData, setPostsData] = useState([]);
  const getPostData = async () => {
    try {
      const { status, data, error } = await GetMyPosts(
        entrepreneurship?.userOwner
      );
      let images = data.posts.filter((imagen)=>imagen.media === "imagen")
      setPostsData({posts:[...images],info:data.user});
      return;
    } catch (error) {
      console.log("error:" + error);
    }
  };

  const getVideosData = async () => {
    try {
      const { status, data, error } = await GetMyPosts(
        entrepreneurship?.userOwner
      );
      let videos = data.posts.filter((video)=>video.media === "video")
      setPostsData({posts:[...videos],info:data.user});
      return;
    } catch (error) {
      console.log("error:" + error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      if (profileSection === "publicaciones") {
        if (entrepreneurship && entrepreneurship?.posts?.length > 0) {
          getPostData();
        }
      } else if (entrepreneurship && entrepreneurship?.posts?.length > 0) {
        getVideosData();
      }
    }, [entrepreneurship, profileSection])
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#D2E4A2",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          width: widthPercentageToDP(100),
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >

        <TouchableOpacity
          onPress={() => setProfileSection("publicaciones")}
          style={
            profileSection === "publicaciones"
              ? {
                  borderBottomColor: "red",
                  borderBottomWidth: 4,
                  paddingVertical: 5,
                }
              : {
                  paddingVertical: 5,
                }
          }
        >
          <Text
            style={
              profileSection === "publicaciones"
                ? { color: "red", fontSize: 18, fontWeight: "700" }
                : { color: "#000", fontSize: 18, fontWeight: "700" }
            }
          >
            Publicaciones
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setProfileSection("videos")}
          style={
            profileSection === "videos"
              ? {
                  borderBottomColor: "red",
                  borderBottomWidth: 4,
                  paddingVertical: 5,
                }
              : {
                  paddingVertical: 5,
                }
          }
        >
          <Text
            style={
              profileSection === "videos"
                ? { color: "red", fontSize: 18, fontWeight: "700" }
                : { color: "#000", fontSize: 18, fontWeight: "700" }
            }
          >
            Videos
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        {postsData &&
          postsData?.posts?.length > 0 ?
          postsData?.posts?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map((post, index) => (
            <PostCard key={`postCard` + index} file={post?.url} />
          )):(
          <Text>No tiene publicaciones o videos...</Text>
        )}
      </ScrollView>
      
    </View>
  );
}
/*<TouchableOpacity onPress={()=>{
              setPostDetailStatus({
              data:post,
              status:true
            })}}>
            <PostCard key={`postCard` + index} file={post?.url} />
            </TouchableOpacity> */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    paddingBottom:heightPercentageToDP(10)

  },
  contentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  imageRectangle: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "#000",
  },
  imageCircle: {
    width: 120,
    height: 120,
    borderTopRightRadius: 10,
    position: "absolute",
    top: 80,
    left: 1,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#000",
  },
  button: {
    backgroundColor: "#171717",
    padding: 15,
    marginVertical: 10,
  },
  textButton: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
});

export default ProfilePosts;
