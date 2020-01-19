import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Profile({ navigation }) {
    const githubUser = navigation.getParam('github_username');
    return (
        <WebView style={styles.container} source={{ uri: `https://github.com/${githubUser}` }} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
