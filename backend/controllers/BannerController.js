const catchAsyncError = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary");
const getDataUri = require("../utils/dataUri");
const BannerModel = require("../models/BannerModel");
const Features = require("../utils/features");
const ErrorHander = require("../Utils/errorhander");


// ------bannerCreate post Api------

exports.BannerCreate = catchAsyncError(async (req, res, next) => {
  const file = req.file;
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.uploader.upload(fileUri.content, {});
  console.log(myCloud, "rggrt");
  const BannerCreated = await BannerModel.create({
    image: {
      public_id: myCloud.public_id,
      url: myCloud.url,
    },
    user: req.user.id,
  });
  res.status(201).json({
    success: true,
    BannerCreated,
  });
});

// ------get banner api------

exports.getBanner = catchAsyncError(async (req, res, next) => {

  const apiFeature = new Features(BannerModel.find(), req.query)
    .search()
    .filter();
  const Banners = await apiFeature.query;

  if (!Banners) {
    return next(new ErrorHander("Banner not found", 404));
  }
  res.status(200).json({
    success: true,
    Banners,
  });
});




// exports.Doorplus_$$_Banner = async (req, res, next) => {
//   try {
//     const heroDoorplus = await BannerModel.find();
//     const bannerCount = await BannerModel.countDocuments();
//     const formattedFaq = heroDoorplus.map(Hero => ({
//       _id: Hero._id,
//       type: "Hero", 
//       HeroSection: {
//         _id: Hero._id,
//         image: Hero.image.url,
//         created_at: Hero.createdAt.toISOString(),
     
//       }
//     }));

//     res.status(200).json({
//       data: formattedFaq,
//       meta: {
//         bannerCount
//       },
//       success: true
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// };

// -----delete Banner Api-----

exports.BannerDelete = async (req, res, next) => {
    const bannerId = req.params.id;

     const countBannerdelete = await BannerModel.countDocuments()
    try {
      const banner = await BannerModel.findByIdAndDelete(bannerId);
      if (!banner) {
        return next(new ErrorHander("Banner not found", 404));
      }
      res.status(200).json({
        success: true,
        message: "Banner deleted successfully",
        countBannerdelete
      });

    } catch (error) {
      next(error);
    }
  };

