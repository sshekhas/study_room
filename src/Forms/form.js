/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const UserForm = () => {
    const onSubmit = (text) => {
        Alert.alert(
            'Your Details',
            text.name,
            text.email,
            text.age,
            text.phone,
          );
    };
    const { handleSubmit, control, getValues, formState: { errors } } = useForm();
    return (
        <ScrollView
        style={styles.container}>
        <View >
        <Spacer />

                <Spacer>
                    <Text h3>User Information</Text>
                </Spacer>
                <Spacer />
                <Spacer />
                <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Name"
                            value={value}
                            onChangeText={(text) => onChange(text)}
                        />
                    )}
                />
                <Spacer />
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        pattern: {
                            value: EMAIL_REGEX,
                            message: 'Not a valid email',
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Email"
                            value={value}
                            onChangeText={(text) => onChange(text)}
                            keyboardType={'email-address'}
                        />
                    )}
                />
                {errors.email && <Text style={styles.errorMessage}>{errors?.email?.message}</Text>}
                <Spacer />
                <Controller
                    name="age"
                    control={control}
                    rules={{
                        validate: () => {
                          return getValues('age') <= 100;
                        },
                      }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Age"
                            value={value}
                            onChangeText={(text) => onChange(text)}
                            keyboardType={'numeric'}
                        />
                    )}
                />
                {errors.age && <Text style={styles.errorMessage}>Enter valid age.</Text>}
                <Spacer />
                <Controller
                    name="phone"
                    control={control}
                    rules={{
                        pattern: {
                            value: PHONE_REGEX,
                            message: 'Not a valid Phone number',
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Phone Number"
                            value={value}
                            onChangeText={(text) => onChange(text)}
                            keyboardType={'numeric'}
                        />
                    )}
                />
                {errors.phone && <Text style={styles.errorMessage}>{errors?.phone?.message}</Text>}
                <Spacer>
                    <Button title={'submit'} onPress={handleSubmit(onSubmit)} label="Submit" />
                </Spacer>
        </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    errorMessage: {
        fontSize: 12,
        color: 'red',
        marginLeft: 15,
        marginTop:0,
    },
});

export default UserForm;
