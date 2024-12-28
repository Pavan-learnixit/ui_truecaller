import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    container: {
        flex: 1, // Full screen height
        backgroundColor: '#f8f8f8',
        margin:10
      },
      topContainer: {
        height: 60, // Fixed height for the top container
        // backgroundColor: '#4caf50',
        justifyContent: 'center',
        alignItems: 'center',
      },
      middleContainer: {
        flexGrow: 1, // Dynamically fill available space
        padding: 20,
        flex:2,
        // backgroundColor: '#2196f3',
        alignItems: 'center',
        flexDirection : 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      bottomContainer: {
        height: 40, // Fixed height for the bottom container
        // backgroundColor: '#ff5722',
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#007AFF',
        marginVertical: 10,
        textAlign: "center"
      },
      subtitle: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 20,
        textAlign: "center"
      },
      footerText: {
        fontSize: 12,
        color: '#007AFF',
        textDecorationLine: 'underline',
        textAlign : "center"
      }
});

export default commonStyles;
