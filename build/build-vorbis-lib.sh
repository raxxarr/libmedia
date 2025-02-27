
simd=$1
atomic=$2

NOW_PATH=$(cd $(dirname $0); pwd)

PROJECT_ROOT_PATH=$(cd $NOW_PATH/../; pwd)

KVAZAAR_PATH=$(cd $PROJECT_ROOT_PATH/../vorbis; pwd)

LIB_OUTPUT_PATH=$PROJECT_ROOT_PATH/lib/vorbis
LIB_BUILD_PATH=$PROJECT_ROOT_PATH/dist/vorbis

EXTRA_CFLAGS="-I$PROJECT_ROOT_PATH/src/cheap/include -I$PROJECT_ROOT_PATH/lib/libogg/include -O3"
EXTRA_LDFLAGS="-sERROR_ON_UNDEFINED_SYMBOLS=0"

if [[ $simd == "1" ]]; then
  EXTRA_CFLAGS="$EXTRA_CFLAGS -pthread -mbulk-memory -msimd128 -fvectorize -fslp-vectorize"
  LIB_OUTPUT_PATH="$LIB_OUTPUT_PATH-simd"
  LIB_BUILD_PATH="$LIB_BUILD_PATH-simd"
else
  if [[ $atomic == "1" ]]; then
    EXTRA_CFLAGS="$EXTRA_CFLAGS -pthread -mbulk-memory"
    LIB_OUTPUT_PATH="$LIB_OUTPUT_PATH-atomic"
    LIB_BUILD_PATH="$LIB_BUILD_PATH-atomic"
  else
    EXTRA_CFLAGS="$EXTRA_CFLAGS -mno-bulk-memory"
  fi
fi

source $PROJECT_ROOT_PATH/../emsdk/emsdk_env.sh

cd $KVAZAAR_PATH

export CFLAGS="$EXTRA_CFLAGS"
export LDFLAGS="$EXTRA_LDFLAGS"

emmake make clean

emconfigure ./configure \
  --prefix=$LIB_OUTPUT_PATH \
  --host=i686-gnu \
  --with-pic \
  --enable-static \
  --disable-shared  \
  --disable-oggtest \
  --with-ogg-includes="$PROJECT_ROOT_PATH/lib/libogg/inculde" \
  --with-ogg-libraries="$PROJECT_ROOT_PATH/lib/libogg/lib" \

emmake make

emmake make install

emmake make clean
