export default interface Password {
  value: string;
  salt?: string;
  validate(oassword: string): boolean;
}
