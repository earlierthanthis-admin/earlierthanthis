'use client';

import { Box, Image, List, Text, Title } from '@mantine/core';

import type { ContentBlock } from '@/src/types';

interface EssayContentBlockProps {
  block: ContentBlock;
}

export const EssayContentBlock = ({ block }: EssayContentBlockProps) => {
  switch (block.type) {
    case 'heading': {
      const level = block.metadata?.level ?? 2;
      return (
        <Title
          id={block.id}
          order={level as 1 | 2 | 3 | 4 | 5 | 6}
          style={{
            color: '#fff',
            marginTop: level === 2 ? '2rem' : '1.5rem',
            marginBottom: '1rem',
            scrollMarginTop: '100px',
          }}
        >
          {block.content}
        </Title>
      );
    }

    case 'paragraph':
      return (
        <Text
          size='md'
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: 1.8,
            marginBottom: '1rem',
          }}
        >
          {block.content}
        </Text>
      );

    case 'image':
      return (
        <Box mb='xl'>
          <Image
            src={block.metadata?.imageUrl}
            alt={block.metadata?.imageCaption ?? block.content}
            radius='md'
            style={{
              maxHeight: 400,
              objectFit: 'cover',
            }}
          />
          {block.metadata?.imageCaption ? (
            <Text
              size='sm'
              ta='center'
              mt='xs'
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
            >
              {block.metadata.imageCaption}
            </Text>
          ) : null}
        </Box>
      );

    case 'quote':
      return (
        <Box
          my='xl'
          pl='lg'
          style={{
            borderLeft: '3px solid #4a9eff',
          }}
        >
          <Text
            size='lg'
            fs='italic'
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1.7,
            }}
          >
            &ldquo;{block.content}&rdquo;
          </Text>
          {block.metadata?.author ? (
            <Text
              size='sm'
              mt='sm'
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
            >
              &mdash; {block.metadata.author}
            </Text>
          ) : null}
        </Box>
      );

    case 'list': {
      const isOrdered = block.metadata?.listType === 'ordered';
      const items = block.metadata?.listItems ?? [];

      return (
        <List
          type={isOrdered ? 'ordered' : 'unordered'}
          spacing='xs'
          mb='lg'
          styles={{
            item: {
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.7,
            },
          }}
        >
          {items.map((item) => (
            <List.Item key={item}>{item}</List.Item>
          ))}
        </List>
      );
    }

    default:
      return null;
  }
};
