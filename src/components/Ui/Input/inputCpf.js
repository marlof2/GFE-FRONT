import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useField } from 'formik';

const Input = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props.name);

    const handleChange = (text) => {
        const maskedText = applyMask(text);
        helpers.setValue(maskedText);
      };

      // Função para aplicar a máscara de CPF
  const applyMask = (text) => {
    let cleaned = ('' + text).replace(/\D/g, ''); // Remove qualquer caractere não numérico
    let match = cleaned.match(/^(\d{1,3})(\d{1,3})?(\d{1,3})?(\d{1,2})?$/);

    if (match) {
      return `${match[1]}${match[2] ? '.' + match[2] : ''}${match[3] ? '.' + match[3] : ''}${match[4] ? '-' + match[4] : ''}`;
    }

    return text;
  };


    return (
        <View>
            <View style={styles.areaInput}>
                <TextInput
                    outlineStyle={{ borderRadius: 10 }}
                    style={styles.input}
                    mode="outlined"
                    label={label}
                    value={field.value}
                    onChangeText={handleChange}
                    onBlur={() => helpers.setTouched(true)}
                    dense
                    error={meta.touched && Boolean(meta.error)}
                    maxLength={14}
                />
            </View>
            {meta.touched && meta.error && <Text style={styles.errorText}>{meta.error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    areaInput: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        width: '95%',
        marginBottom: 5,
    },
    errorText: {
        color: 'red',
        marginLeft: 20,
        marginBottom:8
    },
});

export default Input;
