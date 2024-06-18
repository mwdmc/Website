import type { MDXComponents } from 'mdx/types';
import defaultComponents from 'fumadocs-ui/mdx';
import { Info, Warning, Error, Tip } from './app/components/mdx/Admonition';
import { Steps, Step } from 'fumadocs-ui/components/steps';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    Tip,
    Info,
    Warning,
    Error,
    Step,
    Steps,
    ...components,
  };
}
