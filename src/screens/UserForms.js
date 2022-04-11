import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Alert, View, ActivityIndicator, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchBarComponent from '../components/SearchBarComponent';
import FormCardComponent from '../components/FormCardComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { db, auth } from '../../Firebase/firebase';
import { SwipeListView } from 'react-native-swipe-list-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';


const UserFormScreen = (props) => {

    const [loading, setLoading] = useState(false);
    const [forms, setForms] = useState([]);
    const [formsFilter, setFormsFilter] = useState([]);
    const [text, setText] = useState("");
    const [hiddenItemVisible, setHiddenItemVisible] = useState(false);
    const unsubscribe = useRef();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFormsFilter(forms.filter(f => text === "" || f.formTitle.toUpperCase().indexOf(text.toUpperCase()) !== -1));
        }, 250);
        return () => clearTimeout(timeout)
    }, [text, forms])


    //show createdForms
    useFocusEffect(useCallback(() => {
        loadData();
        return () => {
            unsubscribe.current()
        };
    }, [unsubscribe]));

    const loadData = () => {
        setLoading(true);
        unsubscribe.current = db.collection("forms")
            .where("createdUser", "==", auth.currentUser?.uid)
            .onSnapshot(async (querySnapshot) => {
                const rforms = querySnapshot
                    .docChanges()
                    .filter(({ type }) => type != "removed")
                    .map(async (item) => {
                        const data = item.doc.data();
                        return {
                            key: item.doc.id,
                            formTitle: data.formTitle,
                            createdAt: data.createdAt.toDate(),
                            messageCount: await getMessageCount(item.doc.id),
                            userCount: data.users.length,
                        };
                    })
                await Promise.all(rforms).then(rforms => {
                    if (rforms.length > 0) {
                        setForms(rforms);
                    }
                    setLoading(false);
                });
            });
    }

    const getMessageCount = async (id) => {
        const res = await db.collection("forms" + "/" + id + "/" + "messages").get();
        return res.docs.length;
    }

    const goBack = () => {
        //unsubscribe.current instanceof Function && unsubscribe.current()
        props.navigation.goBack();
    }

    const EmptyListScreen = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons
                    name={"chat-remove-outline"}
                    size={50}
                    color={"#cad1d7"}
                />
                <Text style={{ fontSize: 18, color: "#cad1d7", marginTop: 15 }}>Forum listesi boş !</Text>
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

    const HiddenItemWithActions = props => {
        const {
            onDelete,
        } = props;

        if (!hiddenItemVisible) {
            return null;
        }

        return (
            <TouchableOpacity onPress={onDelete} style={styles.rowBack}>
                <View style={[styles.userFormRightBtn, styles.userFormRightBtnRight]}>
                    <FontAwesome5
                        name={"trash-alt"}
                        color={"#fff"}
                        size={25}>
                    </FontAwesome5>
                </View>
            </TouchableOpacity>
        );
    }
    const deleteRow = (rowMap, rowKey) => {
        const item = rowMap[rowKey]?.props.item;
        Alert.alert(
            "Formu Sil",
            'Seçilen formu silmek istiyor musunuz?'
            , [
                {
                    text: 'Vazgeç',
                    onPress: () => { closeRow(rowMap, rowKey) },
                    style: 'cancel',
                },
                {
                    text: 'Sil',
                    onPress: () => { deleteForm(item) },
                    style: 'destructive'
                },
            ]);
    };

    const onSwipeValueChange = ({ value }) => {
        setHiddenItemVisible(value != 0);
    }

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteForm = async (item) => {
        await deleteMessages(item.key);
        await db.collection("forms").doc(item.key).delete();
        setForms(prev => prev.filter(element => element.key !== item.key));
    }

    const deleteMessages = async (id) => {
        const res = await db.collection(`forms/${id}/messages`).get();
        res.forEach(element => {
            element.ref.delete();
        });
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                <AntDesign
                    name={"back"}
                    size={35}>
                </AntDesign>
            </TouchableOpacity>
            <Text style={styles.screenHeaderWithLogo}>Forumlarım</Text>
            <SearchBarComponent text={text} setText={setText} loading={loading} />
            {loading ? <LoadingScreen /> :
                (formsFilter.length > 0 ?
                    <SwipeListView
                        style={{ padding: 15 }}
                        data={formsFilter}
                        useNativeDriver={false}
                        leftOpenValue={0}
                        rightOpenValue={-75}
                        renderHiddenItem={renderHiddenItem}
                        swipeToOpenPercent={50}
                        onSwipeValueChange={onSwipeValueChange}
                        renderItem={(data) => (
                            <FormCardComponent
                                id={data.item.key}
                                formTitle={data.item.formTitle}
                                messageCount={data.item.messageCount}
                                userCount={data.item.userCount}
                                createdAt={data.item.createdAt}
                                goChat={() => props.navigation.navigate("FormChat", { id: data.item.key, title: data.item.formTitle })}
                            />
                        )}
                    />
                    : <EmptyListScreen />)}
        </SafeAreaView>
    );

}

export default UserFormScreen