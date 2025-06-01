import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Box } from "@gluestack-ui/themed";

const { height: screenHeight } = Dimensions.get("window");

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number;
  overlayColor?: string;
  animationDuration?: number;
};

export function Drawer({
  isOpen,
  onClose,
  children,
  height = screenHeight * 0.5,
  overlayColor = "rgba(0, 0, 0, 0.6)",
  animationDuration = 300,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const translateY = useRef(new Animated.Value(height)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const openEasing = Easing.bezier(0.25, 0.46, 0.45, 0.94);
  const closeEasing = Easing.out(Easing.bezier(0.25, 0.46, 0.45, 0.94));

  useEffect(() => {
    if (isOpen) {
      translateY.setValue(height);
      overlayOpacity.setValue(0);

      setModalVisible(true);

      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: animationDuration,
            easing: openEasing,
            useNativeDriver: true,
          }),
          Animated.timing(overlayOpacity, {
            toValue: 1,
            duration: animationDuration,
            easing: openEasing,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: height,
          duration: animationDuration,
          easing: closeEasing,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: animationDuration,
          easing: closeEasing,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [isOpen, height, animationDuration]);

  if (!modalVisible && !isOpen) {
    return null;
  }

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <Box flex={1} position="relative">
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
          }}
        >
          <TouchableWithoutFeedback onPress={onClose}>
            <Box flex={1} />
          </TouchableWithoutFeedback>
        </Animated.View>

        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height,
            transform: [{ translateY }],
          }}
        >
          <Box
            flex={1}
            bg="$base700"
            shadowColor="$black"
            shadowOffset={{ width: 0, height: -2 }}
            shadowOpacity={0.25}
            shadowRadius={8}
            elevation={5}
            borderTopLeftRadius="$xl"
            borderTopRightRadius="$xl"
          >
            {children}
          </Box>
        </Animated.View>
      </Box>
    </Modal>
  );
}
