import React, {useEffect, useState} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { FaCog } from "react-icons/fa";
import { Settings } from "../types";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {RadioGroup, RadioGroupItem} from './ui/radio-group';
import classNames from 'classnames';
import { HiArrowUp } from "react-icons/hi2";
import OnboardingNote from './OnboardingNote';

interface Props {
  settings: Settings;
  setSettings: (newState: Settings) => void;
  openDialog: boolean;
  setOpenDialog: (newState: boolean) => void;
}

function SettingsDialog({ settings, setSettings, openDialog, setOpenDialog }: Props) {

  const [llm, setLlm] = useState<string>('openai');
  const [delayShowArrow, setDelayShowArrow] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setDelayShowArrow(true);
    }, 500)
  }, []);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger 
        className={classNames(
          "hover:bg-slate-200 rounded-sm p-2 relative flex justify-center items-center",
      )}
      >

      <FaCog />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Settings</DialogTitle>
        </DialogHeader>

        {/* <div className="flex items-center space-x-2">
          <Label htmlFor="image-generation">
            <div>DALL-E Placeholder Image Generation</div>
            <div className="font-light mt-2">
              More fun with it but if you want to save money, turn it off.
            </div>
          </Label>
          <Switch
            id="image-generation"
            checked={settings.isImageGenerationEnabled}
            onCheckedChange={() =>
              setSettings((s) => ({
                ...s,
                isImageGenerationEnabled: !s.isImageGenerationEnabled,
              }))
            }
          />
        </div> */}
        <div className="flex flex-col space-y-4">
          <div className="border-b-2 border-black pb-4">
            <RadioGroup onValueChange={(data) => {
              setLlm(data);
              setSettings({
                ...settings,
                llm: data,
              })
            }} className="flex item-center" color="indigo" defaultValue={settings.llm}>
              
              <Label className="flex item-center" htmlFor="gemini-llm">
                <span className="mr-2">Gemini</span>
                <RadioGroupItem  value="gemini" id="gemini-llm"/>
              </Label>
            </RadioGroup>
          </div>
        
                <p className="text-rose-500">The output effect is not good and it will not be maintained for the time being.</p>
                <Label htmlFor="openai-api-key">
                  <div>Gemini API key</div>
                  <div className="font-light mt-2 leading-relaxed">
                    Only stored in your browser. Never stored on servers. Overrides
                    your .env config.
                  </div>
                </Label>

                <Input
                  id="Gemini-api-key"
                  placeholder="Gemini API key"
                  value={settings?.geminiApiKey || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      geminiApiKey: e.target.value,
                    })
                  }
                />
        
          
        </div>
        {
           process.env.NEXT_PUBLIC_SHOW_MOCK === 'true' && (
            <div className="flex items-center space-x-2">
              <Label htmlFor="image-generation">
                <div>mock AI response</div>
                <div className="font-light mt-2">
                  mock AI response
                </div>
              </Label>
              <Switch
                id="image-generation"
                checked={settings?.mockAiResponse}
                onCheckedChange={() =>
                  setSettings({
                    ...settings,
                    mockAiResponse: !settings.mockAiResponse,
                  })
                }
              />
            </div>
           )
        }

        <DialogFooter>
          <DialogClose>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
