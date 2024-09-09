# Lottie-react

This is a minimalistic copy of the [lottie-react](https://github.com/Gamote/lottie-react/) package. The
original one uses `use-lottie` library to render lottie files, and there are several people reporting that
this lib is quiet heavy. In order to avoid this, `use-lottie` provides a "light" version that is way smaller
in size and it seems to have the same results as the original one.

A PR has been created in `lottie-react` to use the light version of `use-lottie`, but it doesn't look like
it's being reviewed (https://github.com/Gamote/lottie-react/pull/86). Therefore, we've copied the library
inside Mistica and updated it to use `lottie-light` instead. In this way, we reduce the space required by this
library in almost 50%.
