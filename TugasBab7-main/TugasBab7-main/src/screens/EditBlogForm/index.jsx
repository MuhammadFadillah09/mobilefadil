import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, Modal } from 'react-native';
import { ArrowLeft } from 'iconsax-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fontType, colors } from '../../theme';
import axios from 'axios';

const EditBlogForm = ({ route }) => {
    // ambil parameter blogId
    const { blogId, blogData: initialBlogData } = route.params;

    const dataCategory = [
        { id: 1, name: 'Food' },
        { id: 2, name: 'Sports' },
        { id: 3, name: 'Technology' },
        { id: 4, name: 'Fashion' },
        { id: 5, name: 'Health' },
        { id: 6, name: 'Lifestyle' },
        { id: 7, name: 'Music' },
        { id: 8, name: 'Car' },
    ];

    const [blogData, setBlogData] = useState({
        title: '',
        content: '',
        category: {},
        totalLikes: 0,
        totalComments: 0,
    });

    const handleChange = (key, value) => {
        setBlogData({
            ...blogData,
            [key]: value,
        });
    };

    const [image, setImage] = useState(null);
    const navigation = useNavigation();

    // state status apakah sedang loading/tidak
    const [loading, setLoading] = useState(true);

    // fungsi untuk mengambil data blog berdasarkan id
    const getBlogById = async () => {
        setLoading(true);
        try {
             console.log('Memuat ID:', blogId);
                const url = `https://6839b2846561b8d882b15a6a.mockapi.io/api/blog/${blogId}`;
                console.log('Memuat URL:', url);
                const response = await axios.get(url);
                console.log('Data Ditemukan:', response.data);   
            setBlogData({
                title: response.data.title,
                content: response.data.content,
                category: {
                    id: response.data.category.id,
                    name: response.data.category.name
                }
            })
            // atur data gambar
            setImage(response.data.image)
        } catch (error) {
            console.error('Gagal fetch blog:', error.message);
            Alert.alert('Gagal', 'Data blog tidak ditemukan');
        }  finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBlogById();
    }, [blogId]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            // update spesifik data blog (ID) menggunakan metode PUT
            const response = await axios
                .put(`https://6839b2846561b8d882b15a6a.mockapi.io/api/blog/${blogId}`, {
                    title: blogData.title,
                    category: blogData.category,
                    image,
                    content: blogData.content,
                    totalComments: blogData.totalComments,
                    totalLikes: blogData.totalLikes,
                });
            if (response.status == 200) {
                navigation.goBack();
            }
        } catch (e) {
            Alert.alert('error', `${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft color={colors.black()} variant="Linear" size={24} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.title}>Edit blog</Text>
                </View>
            </View>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingVertical: 10,
                    gap: 10,
                }}>
                <View style={textInput.borderDashed}>
                    <TextInput
                        placeholder="Title"
                        value={blogData.title}
                        onChangeText={text => handleChange('title', text)}
                        placeholderTextColor={colors.grey(0.6)}
                        multiline
                        style={textInput.title}
                    />
                </View>
                <View style={[textInput.borderDashed, { minHeight: 250 }]}>
                    <TextInput
                        placeholder="Content"
                        value={blogData.content}
                        onChangeText={text => handleChange('content', text)}
                        placeholderTextColor={colors.grey(0.6)}
                        multiline
                        style={[textInput.content, {textAlignVertical: 'top', minHeight: 250}]}
                    />
                </View>
                <View style={[textInput.borderDashed]}>
                    <TextInput
                        placeholder="Image"
                        value={image}
                        onChangeText={text => setImage(text)}
                        placeholderTextColor={colors.grey(0.6)}
                        style={textInput.content}
                    />
                </View>
                <View style={[textInput.borderDashed]}>
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: fontType['Pjs-Regular'],
                            color: colors.grey(0.6),
                        }}>
                        Category
                    </Text>
                    <View style={category.container}>
                        {dataCategory.map((item, index) => {
                            const bgColor =
                                item.id === blogData.category.id
                                    ? colors.black()
                                    : colors.grey(0.08);
                            const color =
                                item.id === blogData.category.id
                                    ? colors.white()
                                    : colors.grey();
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() =>
                                        handleChange('category', { id: item.id, name: item.name })
                                    }
                                    style={[category.item, { backgroundColor: bgColor }]}>
                                    <Text style={[category.name, { color: color }]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonLabel}>Update</Text>
                </TouchableOpacity>
            </View>

            {/* Menampilkan status loading */}
            <Modal visible={loading} animationType='none' transparent>
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={colors.blue()} />
                </View>
            </Modal>
        </View>
    );
};

export default EditBlogForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white(),
    },
    header: {
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        elevation: 8,
        paddingTop: 8,
        paddingBottom: 4,
    },
    title: {
        fontFamily: fontType['Pjs-Bold'],
        fontSize: 16,
        color: colors.black(),
    },
    bottomBar: {
        backgroundColor: colors.white(),
        alignItems: 'flex-end',
        paddingHorizontal: 24,
        paddingVertical: 10,
        shadowColor: colors.black(),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: colors.blue(),
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLabel: {
        fontSize: 14,
        fontFamily: fontType['Pjs-SemiBold'],
        color: colors.white(),
    },
    loadingOverlay: {
        flex: 1,
        backgroundColor: colors.black(0.4),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const textInput = StyleSheet.create({
    borderDashed: {
        borderStyle: 'dashed',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: colors.grey(0.4),
    },
    title: {
        fontSize: 16,
        fontFamily: fontType['Pjs-SemiBold'],
        color: colors.black(),
        padding: 0,
    },
    content: {
        fontSize: 12,
        fontFamily: fontType['Pjs-Regular'],
        color: colors.black(),
        padding: 0,
    },
});

const category = StyleSheet.create({
    title: {
        fontSize: 12,
        fontFamily: fontType['Pjs-Regular'],
        color: colors.grey(0.6),
    },
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    item: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 25,
    },
    name: {
        fontSize: 10,
        fontFamily: fontType['Pjs-Medium'],
    },
});
