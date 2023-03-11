import { HStack, Spinner, Heading } from "native-base";
import React from "react";

export default function Loading(props: {isLoading: boolean}) {
    return (props.isLoading ? (
        <HStack marginTop={10} space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading lineHeight={15} color="primary.500" fontSize="md">
            Adding Plant...
          </Heading>
        </HStack>
      ) : null);
}