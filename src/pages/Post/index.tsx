import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BiShare } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { LikeButton } from "../../components/LikeButton";
import { Spinner } from "../../components/Spinner";
import { TagsDisplay } from "../../components/TagsDisplay";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { handleShare } from "../../utils/ShareContent";

const Post = () => {
  const { user } = useAuthValue() || {};
  const { id } = useParams<{ id: string }>();
  const { document: post, loading } = useFetchDocument("posts", id);

  return (
    <Box
      maxW="800px"
      w="full"
      p={6}
      mx="auto"
      my={10}
      borderRadius="2xl"
      shadow="lg"
      bg="white"
    >
      {loading ? (
        <Flex justify="center" align="center" h="100%">
          <Spinner />
        </Flex>
      ) : (
        post && (
          <Stack spacing={8}>
            <Box mb={2} overflow="hidden">
              <Image
                src={post.image}
                alt={post.title}
                objectFit="contain"
                w="full"
                loading="lazy"
              />
              <Text
                fontStyle="italic"
                textAlign="center"
                color="gray.600"
                fontSize="sm"
                my={6}
              >
                Por: {post.createdBy}
              </Text>
            </Box>
            <Box overflow="auto" textAlign="left">
              <Heading as="h1" size="2xl" mb={6}>
                {post.title}
              </Heading>
              <Box
                mt={4}
                whiteSpace="pre-wrap"
                wordBreak="break-word"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            </Box>
            <Box mt={8}>
              <Heading as="h3" size="lg" mb={6}>
                Este post trata sobre:
              </Heading>
              <TagsDisplay tags={post.tagsArray} />
            </Box>
            <Flex
              gap={4}
              mt={8}
              align="center"
              justify={{ base: "center", md: "space-between" }}
              wrap="wrap"
            >
              <Button
                as={Link}
                to="/"
                leftIcon={<ArrowBackIcon />}
                variant="outline"
                colorScheme="black"
                width={{ base: "full", md: "auto" }}
              >
                Voltar
              </Button>
              <Button
                onClick={() => handleShare(post)}
                leftIcon={<BiShare />}
                variant="outline"
                colorScheme="black"
                width={{ base: "full", md: "auto" }}
              >
                Compartilhar
              </Button>
              <LikeButton postId={post.id} userId={user?.uid} />
            </Flex>
          </Stack>
        )
      )}
    </Box>
  );
};

export { Post };
