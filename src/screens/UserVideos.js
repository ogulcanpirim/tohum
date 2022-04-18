import React, { useEffect, useState, useCallback } from 'react'
import { Alert, View, ActivityIndicator, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchBarComponent from '../components/SearchBarComponent';
import VideoComponent from '../components/VideoComponent';
import { getStorage, ref, listAll, getMetadata, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db } from '../../Firebase/firebase';
import { createThumbnail } from "react-native-create-thumbnail";
import { SwipeListView } from 'react-native-swipe-list-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '@react-navigation/native';

const UserVideoScreen = (props) => {

    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [videoFilter, setVideoFilter] = useState([]);
    const [text, setText] = useState("");
    const storage = getStorage();
    const theme = useTheme();

    const goBack = () => {
        props.navigation.goBack();
    }

    //real-time search
    const searchVideo = async (text) => {
        setLoading(true);
        const searchPromise = videoFilter.filter(item => {
            const name = item.videoName.toUpperCase();
            const textData = text.toUpperCase();
            return name.indexOf(textData) > -1;
        });
        await Promise.all(searchPromise);
        setVideos(searchPromise);
        setLoading(false);
    }


    const EmptyListScreen = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesome5
                    name={"video-slash"}
                    size={40}
                    color={"#cad1d7"}
                />
                <Text style={{ fontSize: 18, color: "#cad1d7", marginTop: 15 }}>Video listesi boş !</Text>
            </View>
        );
    }


    const LoadingScreen = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#26931e"></ActivityIndicator>
            </View>
        );
    }
    async function getUserName(uid) {
        const response = await db.collection("users").doc(uid).get();
        const data = response.data();
        return data.name + ' ' + data.surname;
    }

    async function getThumbnail(uri) {
        const response = await createThumbnail({ url: uri });
        return response.path;
    }

    const toHHMMSS = (secs) => {
        var sec_num = parseInt(secs, 10)
        var hours = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    const formatLength = (duration) => {
        const seconds = Math.round(parseFloat(duration));
        return toHHMMSS(seconds).toString();
    }

    const pushVideos = async (res) => {
        const userName = await getUserName(auth.currentUser?.uid);
        await Promise.all(res.items.map(async (itemRef) => {
            const metadata = await getMetadata(itemRef);
            const videoUri = await getDownloadURL(itemRef);
            const videoName = itemRef.name;

            const videoData = {
                key: metadata.generation,
                videoName: videoName.substring(0, videoName.length - 4),
                videoPublisher: userName,
                videoLength: formatLength(metadata.customMetadata.duration),
                videoDescription: metadata.customMetadata.description,
                videoUri: videoUri,
                videoThumbnail: await getThumbnail(videoUri),
            };
            appendVideo(videoData);
        }));
    }

    //get user video metadata from storage
    useEffect(() => {
        const videosRef = ref(storage, auth.currentUser?.uid + '/videos');
        const getData = async () => {
            const result = await listAll(videosRef);
            if (result.items.length !== videos.length) {
                await pushVideos(result);
                setLoading(false);
            }
        }
        getData();
    }, []);

    const appendVideo = useCallback((video) => {
        setVideoFilter((previousVideos) => [...previousVideos, video]);
        setVideos((previousVideos) => [...previousVideos, video]);
    }, [videos]);

    const deleteRow = (rowMap, rowKey) => {
        const item = rowMap[rowKey]?.props.item;
        Alert.alert(
            "Videoyu Sil",
            'Seçilen videoyu silmek istiyor musunuz?'
            , [
                {
                    text: 'Vazgeç',
                    onPress: () => { closeRow(rowMap, rowKey) },
                    style: 'cancel',
                },
                {
                    text: 'Sil',
                    onPress: () => { deleteVideo(item) },
                    style: 'destructive'
                },
            ]);
    };

    const deleteVideo = async (item) => {
        setLoading(true);
        if (item) {
            const fileRef = ref(storage, auth.currentUser?.uid + '/videos/' + item.videoName + '.mp4');
            deleteObject(fileRef).then(async () => {
                setVideoFilter(videoFilter.filter(video => video.key !== item.key));
                setVideos(videoFilter.filter(video => video.key !== item.key));
                setText("");
                setLoading(false);
                Alert.alert("Bildirim", "Video silindi.");
            }).catch((error) => {
                console.log(error);
            })

        }
        setLoading(false);
    }

    const HiddenItemWithActions = props => {
        const {
            onDelete,
        } = props;

        return (
            <TouchableOpacity onPress={onDelete} style={styles.rowBack}>
                <View style={[styles.userVideobackRightBtn, styles.userVideobackRightBtnRight]}>
                    <FontAwesome5
                        name={"trash-alt"}
                        color={"#fff"}
                        size={25}>
                    </FontAwesome5>
                </View>
            </TouchableOpacity>
        );
    }

    const renderHiddenItem = (data, rowMap) => {
        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                onClose={() => closeRow(rowMap, data.item.key)}
                onDelete={() => deleteRow(rowMap, data.item.key)}
            />
        );
    }

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                <AntDesign
                    name={"back"}
                    color={theme.colors.text}
                    size={35}>
                </AntDesign>
            </TouchableOpacity>
            <Text style={{...styles.screenHeaderWithLogo, color: theme.colors.text}}>Videolarım</Text>
            <SearchBarComponent text={text} setText={setText} searchFunction={searchVideo} />
            {loading ? <LoadingScreen /> :
                videos.length ? <SwipeListView
                    style={{ padding: 15 }}
                    data={videos}
                    renderItem={(video) => (
                        <VideoComponent
                            key={video.item.key}
                            name={video.item.videoName}
                            publisher={video.item.videoPublisher}
                            length={video.item.videoLength}
                            thumbnail={video.item.videoThumbnail}
                            userAvatar={auth.currentUser?.photoURL}
                            theme={theme}
                            goVideo={() => props.navigation.navigate("VideoComponent", { ...video.item, userAvatar: auth.currentUser?.photoURL })}
                        />
                    )}
                    renderHiddenItem={renderHiddenItem}
                    useNativeDriver={false}
                    rightOpenValue={-75}
                /> : <EmptyListScreen />}
        </SafeAreaView>
    );

}

export default UserVideoScreen;