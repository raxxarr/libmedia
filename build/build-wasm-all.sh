NOW_PATH=$(cd $(dirname $0); pwd)

sh $NOW_PATH/build-decoder.sh h264 0 0
sh $NOW_PATH/build-decoder.sh hevc 0 0
sh $NOW_PATH/build-decoder.sh vvc 0 0
sh $NOW_PATH/build-decoder.sh mpeg4 0 0
sh $NOW_PATH/build-decoder.sh vp8 0 0
sh $NOW_PATH/build-decoder.sh vp9 0 0
sh $NOW_PATH/build-decoder-av1.sh 0 0

sh $NOW_PATH/build-decoder.sh aac 0 0
sh $NOW_PATH/build-decoder.sh mp3 0 0
sh $NOW_PATH/build-decoder.sh opus 0 0
sh $NOW_PATH/build-decoder.sh flac 0 0
sh $NOW_PATH/build-decoder.sh vorbis 0 0
sh $NOW_PATH/build-decoder-speex.sh 0 0
sh $NOW_PATH/build-decoder-pcm.sh 0 0

sh $NOW_PATH/build-decoder.sh h264 0 1
sh $NOW_PATH/build-decoder.sh hevc 0 1
sh $NOW_PATH/build-decoder.sh vvc 0 1
sh $NOW_PATH/build-decoder.sh av1 0 1
sh $NOW_PATH/build-decoder.sh mpeg4 0 1
sh $NOW_PATH/build-decoder-av1.sh 0 1
sh $NOW_PATH/build-decoder.sh vp8 0 1
sh $NOW_PATH/build-decoder.sh vp9 0 1

sh $NOW_PATH/build-decoder.sh aac 0 1
sh $NOW_PATH/build-decoder.sh mp3 0 1
sh $NOW_PATH/build-decoder.sh opus 0 1
sh $NOW_PATH/build-decoder.sh flac 0 1
sh $NOW_PATH/build-decoder.sh vorbis 0 1
sh $NOW_PATH/build-decoder-speex.sh 0 1
sh $NOW_PATH/build-decoder-pcm.sh 0 1

sh $NOW_PATH/build-decoder.sh h264 1 0

sh ./build/build-resample.sh 0 0
sh ./build/build-stretchpitch.sh 0 0
sh ./build/build-resample.sh 0 1
sh ./build/build-stretchpitch.sh 0 1