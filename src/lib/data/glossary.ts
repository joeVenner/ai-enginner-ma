export const glossaryData: Record<string, { definition: string; link?: string }> = {
  rag: {
    definition: "Retrieval-Augmented Generation. An AI framework that retrieves facts from an external knowledge base to ground large language models on accurate, up-to-date information.",
  },
  llm: {
    definition: "Large Language Model. A type of artificial intelligence algorithm that applies neural network techniques with massive amounts of data to understand, summarize, generate and predict new content.",
  },
  "vector db": {
    definition: "Vector Database. A type of database specifically designed to store and query high-dimensional vectors, optimized for finding similar items (nearest neighbors) rapidly.",
  },
  gpu: {
    definition: "Graphics Processing Unit. A specialized electronic circuit designed to manipulate and alter memory to accelerate the creation of images, now heavily used to train and run AI models.",
  },
  api: {
    definition: "Application Programming Interface. A set of rules and protocols that allows different software applications to communicate with each other.",
  },
  "fine-tuning": {
    definition: "The process of taking a pre-trained language model and training it further on a smaller, domain-specific dataset to specialize its knowledge and behavior.",
  }
};
