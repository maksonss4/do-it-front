import { Box, Skeleton, SkeletonProps } from "@chakra-ui/react";
import * as uuid from "uuid";

interface ICardSkeletonProps extends SkeletonProps {
  repeatCount: number;
}

export const CardSkeleton = ({
  repeatCount = 1,
  ...rest
}: ICardSkeletonProps) => {
  const howMany = Array.from(Array(repeatCount).keys());

  return (
    <>
      {howMany.map((_) => {
        return (
          <Skeleton
            {...rest}
            speed={1}
            key={uuid.v4()}
            startColor="gray.100"
            endColor="gray.200"
          >
            <Box w="100%" h="190px" padding="7" />
          </Skeleton>
        );
      })}
    </>
  );
};
