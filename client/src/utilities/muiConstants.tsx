export const muiConstants = {
  input: {
    fontSize: 14,
    padding: 12,
  },
  label(text: string) {
    return (
      <span
        style={{
          fontSize: 15,
          textTransform: "capitalize",
        }}
      >
        {text}
      </span>
    );
  },
};
