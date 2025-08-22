import { type FC } from "react";
import { Info, RefreshCcwIcon, CheckCircle, AlertTriangle } from "lucide-react";
import Webcam from "react-webcam";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";

import { Button } from "@/shared/components/ui/button";

import AiAvatar from "@/assets/images/ai-avatar.png";
import { type Interview } from "@/features/PreInterviewScreen/types";
// import { envConfig } from "@/config/env.config";

interface MediaDevice {
  deviceId: string;
  kind: string;
  label: string;
}

interface MediaPermissions {
  camera: boolean;
  microphone: boolean;
}

interface Props {
  // Interview data
  interview: Interview;

  // Form state
  name: string;
  onNameChange: (value: string) => void;

  // Device state
  cameras: MediaDevice[];
  microphones: MediaDevice[];
  speakers: MediaDevice[];
  selectedCamera: string;
  selectedMicrophone: string;
  selectedSpeaker: string;
  onCameraChange: (value: string) => void;
  onMicrophoneChange: (value: string) => void;
  onSpeakerChange: (value: string) => void;

  // Permission state
  permissions: MediaPermissions;
  cameraError: string | null;
  microphoneError: string | null;
  permissionsError: string | null;

  // Loading states
  isLoading: boolean;
  isStarting: boolean;

  // Actions
  onStartInterview: () => void;
  onRefreshDevices: () => void;
}

export const PreInterviewScreenComponent: FC<Props> = ({
  interview,
  name,
  onNameChange,
  cameras,
  microphones,
  speakers,
  selectedCamera,
  selectedMicrophone,
  selectedSpeaker,
  onCameraChange,
  onMicrophoneChange,
  onSpeakerChange,
  permissions,
  cameraError,
  microphoneError,
  permissionsError,
  isLoading,
  isStarting,
  onStartInterview,
  onRefreshDevices,
}) => {
  const isNameValid = name.trim() !== "";
  const hasAnyPermission = permissions.camera || permissions.microphone;
  const canStartInterview =
    isNameValid &&
    hasAnyPermission &&
    !cameraError &&
    !microphoneError &&
    !permissionsError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Interview Lobby
          </h1>
          <p className="text-gray-600">
            Set up your camera and microphone before joining
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
          {/* Main Video Section */}
          <div className="w-full lg:w-2/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-xl">
                    {"Interview Position"}
                  </h2>
                  <div className="flex gap-2">
                    <Badge
                      variant={permissions.camera ? "default" : "secondary"}
                    >
                      {permissions.camera ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" /> Camera
                        </>
                      ) : (
                        <>Camera Off</>
                      )}
                    </Badge>
                    <Badge
                      variant={permissions.microphone ? "default" : "secondary"}
                    >
                      {permissions.microphone ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" /> Microphone
                        </>
                      ) : (
                        <>Microphone Off</>
                      )}
                    </Badge>
                  </div>
                </div>

                {/* Video Preview */}
                <div className="aspect-video bg-gray-900 rounded-lg mb-4 overflow-hidden">
                  {selectedCamera && permissions.camera ? (
                    <Webcam
                      audio={false}
                      videoConstraints={{
                        deviceId: { exact: selectedCamera },
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                      }}
                      className="w-full h-full object-cover scale-x-[-1]"
                      onError={(err) => {
                        console.error("Webcam error:", err);
                        toast.error("Webcam error occurred");
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-white">
                        {!permissions.camera && cameraError && (
                          <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-400" />
                        )}
                        {!permissions.camera && !cameraError && (
                          <div className="w-16 h-16 mx-auto mb-4 bg-gray-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-8 h-8" />
                          </div>
                        )}
                        <p className="text-lg mb-2">
                          {cameraError ? "Camera Unavailable" : "Camera Ready"}
                        </p>
                        <p className="text-sm text-gray-400">
                          {cameraError
                            ? "Please check camera permissions"
                            : "Select a camera to see preview"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    placeholder="Enter your full name"
                    className={`max-w-md ${
                      !isNameValid
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-green-500 focus-visible:ring-green-500"
                    }`}
                    required
                  />
                  {!isNameValid && name.length > 0 && (
                    <p className="text-red-500 text-sm">Name is required</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="w-full lg:w-1/3 space-y-4">
            {/* Permissions Error Alert */}
            {permissionsError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Permission Error</AlertTitle>
                <AlertDescription>{permissionsError}</AlertDescription>
              </Alert>
            )}

            {/* Privacy Notice */}
            <div className="p-4 bg-blue-100 text-blue-700 rounded-lg flex items-center gap-2">
              <Info className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">
                We do not record or store your voice & video
              </span>
            </div>

            {/* Ready to Join Card */}
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-3">Ready to join?</h2>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={AiAvatar}
                    alt="AI Avatar"
                    className="rounded-full"
                  />
                  <div className="text-sm">
                    <div className="font-semibold">AI Bot</div>
                    <div className="text-gray-500">is waiting in the call</div>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={onStartInterview}
                  disabled={!canStartInterview || isStarting}
                  size="lg"
                >
                  {isStarting ? "Starting Interview..." : "Start Interview"}
                </Button>

                {!canStartInterview && (
                  <div className="mt-2 text-xs text-gray-600">
                    {!isNameValid && "• Enter your name"}
                    {!hasAnyPermission && "• Grant camera or microphone access"}
                    {(cameraError || microphoneError) &&
                      "• Fix device permission issues"}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Refresh Devices Button */}
            <Button
              className="w-full"
              variant="outline"
              onClick={onRefreshDevices}
              disabled={isLoading}
              size="default"
            >
              <RefreshCcwIcon className="w-4 h-4 mr-2" />
              {isLoading ? "Refreshing..." : "Refresh Devices"}
            </Button>

            {/* Device Selection */}
            <div className="space-y-4">
              {/* Camera Selection */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Camera</Label>
                <Select
                  onValueChange={onCameraChange}
                  value={selectedCamera}
                  disabled={cameras.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        cameras.length === 0
                          ? "No cameras found"
                          : "Select Camera"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {cameras.map((camera) => (
                      <SelectItem key={camera.deviceId} value={camera.deviceId}>
                        {camera.label ||
                          `Camera (${camera.deviceId.substring(0, 8)}...)`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {cameraError && (
                  <p className="text-red-500 text-xs mt-1">{cameraError}</p>
                )}
              </div>

              {/* Microphone Selection */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Microphone
                </Label>
                <Select
                  onValueChange={onMicrophoneChange}
                  value={selectedMicrophone}
                  disabled={microphones.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        microphones.length === 0
                          ? "No microphones found"
                          : "Select Microphone"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {microphones.map((mic) => (
                      <SelectItem key={mic.deviceId} value={mic.deviceId}>
                        {mic.label ||
                          `Microphone (${mic.deviceId.substring(0, 8)}...)`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {microphoneError && (
                  <p className="text-red-500 text-xs mt-1">{microphoneError}</p>
                )}
              </div>

              {/* Speaker Selection */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Speaker
                </Label>
                <Select
                  onValueChange={onSpeakerChange}
                  value={selectedSpeaker}
                  disabled={speakers.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        speakers.length === 0
                          ? "No speakers found"
                          : "Select Speaker"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {speakers.map((speaker) => (
                      <SelectItem
                        key={speaker.deviceId}
                        value={speaker.deviceId}
                      >
                        {speaker.label ||
                          `Speaker (${speaker.deviceId.substring(0, 8)}...)`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
