import { type FC, useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

// import * as InterviewServices from "@/services/interview.services";
import {type Interview } from "@/features/PreInterviewScreen/types";
import { InterviewStatusEnum } from "@/shared/lib/enums";
import { PreInterviewScreenComponent } from "@/features/PreInterviewScreen/PreInterviewScreenComponent"

interface Props {
  interview: Interview;
  setInterview: React.Dispatch<React.SetStateAction<Interview | undefined>>;
  setIsInterviewStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  userName?: string;
}

interface MediaDevice {
  deviceId: string;
  kind: string;
  label: string;
}

interface MediaPermissions {
  camera: boolean;
  microphone: boolean;
}

export const PreInterviewScreenContainer: FC<Props> = ({
  interview,
  setIsInterviewStarted,
  setError,
  setErrorMessage,
  setInterview,
  userName = "",
}) => {
  // State management
  const [name, setName] = useState<string>(userName);
  const [devices, setDevices] = useState<MediaDevice[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [selectedMicrophone, setSelectedMicrophone] = useState<string>("");
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("");
  
  const [permissions, setPermissions] = useState<MediaPermissions>({
    camera: false,
    microphone: false,
  });
  
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [microphoneError, setMicrophoneError] = useState<string | null>(null);
  const [permissionsError, setPermissionsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStarting, setIsStarting] = useState<boolean>(false);

  // Handle starting the interview
  const handleStartInterview = async (): Promise<void> => {
    if (name.trim() === "") {
      toast.error("Please provide your name");
      return;
    }

    if (cameraError || microphoneError || permissionsError) {
      toast.error("Please ensure camera and microphone access is granted");
      return;
    }

    if (!permissions.camera && !permissions.microphone) {
      toast.error("Camera or microphone access required to start interview");
      return;
    }

    setIsStarting(true);

    try {
      await InterviewServices.initiateInterview(interview._id as string, name);

      setInterview((prevInterview) =>
        prevInterview
          ? {
              ...prevInterview,
              status: InterviewStatusEnum.SCHEDULED,
              candidateName: name,
            }
          : prevInterview,
      );
      
      setIsInterviewStarted(true);
      toast.success("Interview started successfully!");
    } catch (error) {
      console.error("Failed to start interview:", error);
      
      if (error instanceof AxiosError && error.response) {
        setErrorMessage(error.response.data?.message || error.message);
      } else {
        setErrorMessage("Unable to start interview. Please try again.");
      }
      setError(true);
      toast.error("Failed to start interview");
    } finally {
      setIsStarting(false);
    }
  };

  // Fetch available media devices
  const fetchDevices = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setPermissionsError(null);

    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const validDevices = deviceList.filter((device) => device.deviceId !== "");
      setDevices(validDevices);

      // Select default devices
      const defaultCamera = validDevices.find(
        (device) => device.kind === "videoinput",
      );
      const defaultMicrophone = validDevices.find(
        (device) => device.kind === "audioinput",
      );
      const defaultSpeaker = validDevices.find(
        (device) => device.kind === "audiooutput",
      );

      if (defaultCamera) setSelectedCamera(defaultCamera.deviceId);
      if (defaultMicrophone) setSelectedMicrophone(defaultMicrophone.deviceId);
      if (defaultSpeaker) setSelectedSpeaker(defaultSpeaker.deviceId);

      // Clear previous errors
      setCameraError(null);
      setMicrophoneError(null);
    } catch (error) {
      console.error("Failed to fetch devices:", error);
      setPermissionsError(
        "Failed to fetch media devices. Please check your browser permissions.",
      );
      toast.error("Could not access media devices");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Request camera permission
  const requestVideoPermission = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          deviceId: selectedCamera ? { exact: selectedCamera } : undefined 
        } 
      });
      
      setCameraError(null);
      setPermissions(prev => ({ ...prev, camera: true }));
      
      // Stop the stream immediately as we just needed to test permissions
      stream.getTracks().forEach(track => track.stop());
    } catch (error: any) {
      console.error("Camera permission error:", error);
      setCameraError(
        error.name === "NotAllowedError" 
          ? "Camera access denied. Please allow camera permissions in your browser."
          : "Check if your webcam is connected and permissions are granted.",
      );
      setPermissions(prev => ({ ...prev, camera: false }));
    }
  };

  // Request microphone permission
  const requestAudioPermission = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          deviceId: selectedMicrophone ? { exact: selectedMicrophone } : undefined 
        } 
      });
      
      setMicrophoneError(null);
      setPermissions(prev => ({ ...prev, microphone: true }));
      
      // Stop the stream immediately as we just needed to test permissions
      stream.getTracks().forEach(track => track.stop());
    } catch (error: any) {
      console.error("Microphone permission error:", error);
      setMicrophoneError(
        error.name === "NotAllowedError"
          ? "Microphone access denied. Please allow microphone permissions in your browser."
          : "Check if your microphone is connected and permissions are granted.",
      );
      setPermissions(prev => ({ ...prev, microphone: false }));
    }
  };

  // Device change handlers
  const handleCameraChange = (value: string): void => {
    setSelectedCamera(value);
  };

  const handleMicrophoneChange = (value: string): void => {
    setSelectedMicrophone(value);
  };

  const handleSpeakerChange = (value: string): void => {
    setSelectedSpeaker(value);
  };

  const handleNameChange = (value: string): void => {
    setName(value);
  };

  // Filter devices by type
  const cameras = devices.filter((device) => device.kind === "videoinput");
  const microphones = devices.filter((device) => device.kind === "audioinput");
  const speakers = devices.filter((device) => device.kind === "audiooutput");

  // Initialize devices and permissions on mount
  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  // Request permissions when devices change
  useEffect(() => {
    if (selectedCamera) {
      requestVideoPermission();
    }
  }, [selectedCamera]);

  useEffect(() => {
    if (selectedMicrophone) {
      requestAudioPermission();
    }
  }, [selectedMicrophone]);

  return (
    <PreInterviewScreenComponent
      // Interview data
      interview={interview}
      
      // Form state
      name={name}
      onNameChange={handleNameChange}
      
      // Device state
      cameras={cameras}
      microphones={microphones}
      speakers={speakers}
      selectedCamera={selectedCamera}
      selectedMicrophone={selectedMicrophone}
      selectedSpeaker={selectedSpeaker}
      onCameraChange={handleCameraChange}
      onMicrophoneChange={handleMicrophoneChange}
      onSpeakerChange={handleSpeakerChange}
      
      // Permission state
      permissions={permissions}
      cameraError={cameraError}
      microphoneError={microphoneError}
      permissionsError={permissionsError}
      
      // Loading states
      isLoading={isLoading}
      isStarting={isStarting}
      
      // Actions
      onStartInterview={handleStartInterview}
      onRefreshDevices={fetchDevices}
    />
  );
};