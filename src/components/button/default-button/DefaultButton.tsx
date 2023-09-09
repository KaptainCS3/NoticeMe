import {View, Text, TouchableOpacity} from 'react-native';

interface Props {
  handleSubmit?: () => void;
  isSubmitting?: boolean;
  styleBtn?: any;
  btnText?: string;
}
import {MaterialIndicator} from 'react-native-indicators';

const DefaultButton = ({
  handleSubmit,
  isSubmitting,
  styleBtn,
  btnText,
}: Props) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          styleBtn ? [styleBtn[0]] : null,
          isSubmitting ? {opacity: 0.5, shadowOpacity: 0.5} : null,
        ]}
        onPress={handleSubmit}
        disabled={isSubmitting}>
        <Text style={styleBtn ? [styleBtn[1]] : null}>
          {isSubmitting ? <MaterialIndicator color="#8ac3ee" /> : btnText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DefaultButton;
