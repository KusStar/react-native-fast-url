#ifdef __cplusplus
#import "react-native-fast-url.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNFastUrlSpec.h"

@interface FastUrl : NSObject <NativeFastUrlSpec>
#else
#import <React/RCTBridgeModule.h>

@interface FastUrl : NSObject <RCTBridgeModule>
#endif

@end
