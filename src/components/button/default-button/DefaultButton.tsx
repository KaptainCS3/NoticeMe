import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface Props {
  handleSubmit?: () => void;
  isSubmitting?: boolean;
}

const DefaultButton = ({handleSubmit, isSubmitting}: Props) => {
  if (isSubmitting) {
    console.log(isSubmitting);
  } else {
    console.log('value is false');
  }

  return (
    <View>
      <TouchableOpacity
        style={[styles.button]}
        onPress={handleSubmit}
        disabled={isSubmitting}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DefaultButton;

const styles = StyleSheet.create({
  button: {
    marginTop: 13,
    backgroundColor: '#1E319D',
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
