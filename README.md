# PIMEX-SConvLS

**Spatiotemporal ConvLSTM Surrogate for Multi-Step Prediction of Tunnelling-Induced Surface Displacement**

This repository is associated with the development of **SConvLS (Spatiotemporal ConvLSTM Surrogate)**, a deep-learning framework for predicting ground surface displacement induced by mechanised tunnel excavation.

The research is conducted within **PIMEX — Physics-Informed Modular Digital Twin for Real-Time Prediction in Mechanized Tunnelling**.

## Overview

Accurate and computationally efficient prediction of tunnelling-induced ground deformation is essential for assessing potential impacts on surrounding infrastructure.

SConvLS uses spatiotemporal deep learning to approximate the displacement response obtained from numerical simulations of Earth Pressure Balance (EPB) tunnelling. The framework combines ConvLSTM and convolutional layers to capture spatial relationships and temporal evolution throughout the excavation process.

The study investigates:

- Multi-step prediction of complete surface displacement fields.
- Learning from physics-based FLAC3D numerical simulations.
- Comparison of predictive performance with a conventional ConvLSTM baseline.
- Assessment of predictive uncertainty using conformal calibration.

## Research Framework

The framework is developed using:

- **Numerical simulation:** FLAC3D twin-tunnel excavation models.
- **Dataset:** 240 numerical excavation scenarios.
- **Spatial resolution:** 25 × 41 surface grid.
- **Input sequence:** 10 preceding excavation steps.
- **Prediction horizon:** 5 subsequent excavation steps.
- **Architecture:** Two stacked ConvLSTM layers combined with Conv2D layers.

## Repository Status

🚧 **Research in progress**

The interactive saved-scenario dashboard is available in the `dashboard/` folder. Training code, configuration files and further reproducibility resources will be added as they become available for public release.

## Interactive Dashboard

**[Open the public SConvLS dashboard](https://mazibahri.github.io/PIMEX-SConvLS/dashboard/)**

Explore 30 final-test excavation scenarios, move through the construction stages and select a surface node to inspect its five-step settlement predictions, FLAC3D reference, nominal 95% pointwise bands and transverse/longitudinal profiles. The interface includes schematic 3D twin-tunnel geometry, illustrative EPB movement and light/dark themes.

This version displays precomputed results. It does not run FLAC3D or perform new model inference; the displayed scenario parameters are read-only. Prediction intervals describe surrogate errors relative to FLAC3D, not engineering safety limits.

## Project and Funding

This research is associated with the project:

**PIMEX — Physics-Informed Modular Digital Twin for Real-Time Prediction in Mechanized Tunnelling**

Grant Agreement ID: **101276407**

## Author

**Maziyar Bahri**

## Citation

Citation information will be provided following publication of the associated research paper.

## License

A license will be specified when the research code is released.
