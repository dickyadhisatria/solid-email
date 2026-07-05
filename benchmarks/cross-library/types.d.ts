declare module 'mjml' {
  export interface MjmlValidationError {
    formattedMessage: string;
  }

  export interface MjmlResult {
    html: string;
    errors: MjmlValidationError[];
  }

  export interface MjmlOptions {
    validationLevel?: 'strict' | 'soft' | 'skip';
  }

  export default function mjml(
    input: string,
    options?: MjmlOptions,
  ): MjmlResult;
}
