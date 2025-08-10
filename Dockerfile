FROM openjdk:11-jdk

# Install required packages
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    git \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV ANDROID_HOME=/opt/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# Install Android SDK
RUN mkdir -p $ANDROID_HOME && cd $ANDROID_HOME
RUN curl -o sdk.zip https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip
RUN unzip sdk.zip && rm sdk.zip

# Accept licenses
RUN yes | $ANDROID_HOME/cmdline-tools/bin/sdkmanager --licenses

# Install Android SDK components
RUN $ANDROID_HOME/cmdline-tools/bin/sdkmanager \
    "platform-tools" \
    "platforms;android-33" \
    "build-tools;33.0.0"

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy source code
COPY . .

# Create assets directory
RUN mkdir -p android/app/src/main/assets

# Bundle JavaScript
RUN npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Build APK
RUN cd android && ./gradlew assembleRelease

# Copy APK to output directory
RUN mkdir -p /output
RUN cp android/app/build/outputs/apk/release/app-release.apk /output/

# Expose output directory
VOLUME /output

CMD ["echo", "APK built successfully! Check /output directory."] 